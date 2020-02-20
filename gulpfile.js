var TEST_PATH = 'test/sass',
    CURRENT_PATH = './', 
    SOURCE_PATH = 'input',
    EXPECTED_OUTPUT_PATH = 'expected-output',
    OUTPUT_PATH = 'generated-output',
    FWK_ERROR_PREFIX = 'SPOT CSS: ',

    FULL_SOURCE_PATH = CURRENT_PATH + TEST_PATH + '/' + SOURCE_PATH,
    FULL_EXPECTED_OUTPUT_PATH = CURRENT_PATH + TEST_PATH + '/' + EXPECTED_OUTPUT_PATH,
    FULL_OUTPUT_PATH = CURRENT_PATH + TEST_PATH + '/' + OUTPUT_PATH,
    
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    fs = require('fs'),
    es = require('event-stream'),
    fileExists = require('file-exists'),
    process = require('process'),
    through = require('through2'),
    clc = require('cli-color');
    diff = require('gulp-diff'),
    del = require('del'),    
    sourcemaps = require('gulp-sourcemaps'),
    gulpFlatmap = require('gulp-flatmap');

sass.compiler = require('node-sass');

// ---------------------------------------------------------------------

gulp.task('log-start', function(cb){    
    noErrors = true;
    cb();
});

gulp.task('clean', function(){
    return del(FULL_OUTPUT_PATH);
});

gulp.task('check-expected-output-files', function() {
    return gulp.src(FULL_SOURCE_PATH + '/**/*.s[ac]ss')
        // check files if exists in EXPECTED_OUTPUT_PATH
        .pipe(checkFiles(es));
});

gulp.task('sass', function() {
    return gulp.src(FULL_SOURCE_PATH + '/**/*.s[ac]ss')
        // gulpFlatmap is used to not fail pasing SASS if one of the files will fail
        .pipe(gulpFlatmap(function (stream) {  // the stream contains a single file 
            return stream
               .pipe(sourcemaps.init())
               .pipe(sass({outputStyle: 'expanded'})).on('error', throwSassError)
               // write CSS files into SOURCE_PATH
               .pipe(gulp.dest(FULL_OUTPUT_PATH))
         }));
});

gulp.task('check-diff', function() {
    return gulp.src(FULL_OUTPUT_PATH + '/**/*.css')
        // compare generated files with expected output (mute )
        .pipe(diff(FULL_EXPECTED_OUTPUT_PATH).on('error', function(e){ 
            // mute this kind of error - it is outputed in task "check-expected-output-files" already
            if (e.toString().indexOf('Failed to stat file')!==-1) {
                this.emit('end');
            }
        }))
        .pipe(reporter({ fail: false, quiet: false }));
});

gulp.task('status', function() {
    return gulp.src(FULL_OUTPUT_PATH + '/**/*.css')
        .pipe(finish());
});

gulp.task('test', 
    gulp.series(
        'log-start', 
        'clean', 
        'check-expected-output-files', 
        'sass', 
        'check-diff', 
        'status'
    )
);

gulp.task('watch', function() {
    return gulp.watch([
        FULL_SOURCE_PATH + '/**/*.s[ac]ss', 
        FULL_EXPECTED_OUTPUT_PATH + '/**/*.css', 
        './src/**.s[ac]ss'
    ], gulp.series('test'));
});

gulp.task('test:watch', gulp.series('test', 'watch'));

// copy generated to expected (sync of directories)
gulp.task('test:sync', function(){
    return gulp.src(FULL_OUTPUT_PATH + '/**/*.css')
        .pipe(gulp.dest(FULL_EXPECTED_OUTPUT_PATH));
});

// ---------------------------------------------------------------------

function throwSassError(error) {    
    var originalFile = error.message.split('\n')[0],
        sourceFile = (error.message.match(new RegExp('from line \\d+ of ('+TEST_PATH + '\\/' + SOURCE_PATH + '.*)[,$]')) || error.message.match(/from line \d+ of (.*)/))[1],
        targetFile = (sourceFile || originalFile).replace(SOURCE_PATH, OUTPUT_PATH).replace(/\.s[ac]ss$/, '.css'),
        isFwkError = error.messageOriginal.indexOf(FWK_ERROR_PREFIX)===0,
        message = isFwkError ? error.messageOriginal.split(' - ')[0] : error.messageFormatted;
    
    if (isFwkError) {
        // write expected (SPOT CSS framework) error to target file
        fs.mkdir(getPathWithoutFileName(targetFile), { recursive: true }, function(err, cb) {
            fs.writeFileSync(targetFile, '/* Error '+message+' */');
        });        
    }
    else {
        // non-expected (SASS) errors write to console
        throwError(1, message);        
    }
    this.emit('end');
}

var noErrors = true,
    failedAlreadyPrinted = false;

function start() {
    return through.obj(function (file, enc, cb) {
        noErrors = true;
        failedAlreadyPrinted = false;
        return cb(null, file);
    });
}

function finish(cb) {
    if (noErrors) {
        console.log('\x1b[32m%s\x1b[0m ', 'OK');  // green color
    }
    else if (!failedAlreadyPrinted) {
        console.log('\x1b[31m%s\x1b[0m', 'Failed!');  // red color
    }
    return through.obj(function (file, enc, cb) {
        return cb(null, file);
    });
}

function throwError(code, message) {
    console.log('\x1b[31m%s\x1b[0m', 'Failed!');  // red color
    failedAlreadyPrinted = true;
    if (message) {
        console.log(message);
    }
    noErrors = false;
    //process.exit(-1);
}

function checkFiles(es) {
    return es.map(function(file, cb) {    
        var slash = recognizeSlash(file.path),
            extension = getFileExtension(file.path),
            fileNameWithoutExtension = getFileNameWithoutExtension(file.path),
            expectedOutputFile = CURRENT_PATH + normalizePath( TEST_PATH + slash + EXPECTED_OUTPUT_PATH + slash + getRelativePathWithoutFileName(file.path, SOURCE_PATH) + fileNameWithoutExtension ) + '.css';

        fileExists(expectedOutputFile, (err, exists) => {
            if (err) cb(err, file);
            if (!exists) {                
                throwError(1, 'Missing file in /'+TEST_PATH+'/'+EXPECTED_OUTPUT_PATH+'/'+fileNameWithoutExtension+'.css\n'+
                        'as an expected output '+
                        'to input file /'+TEST_PATH+'/'+SOURCE_PATH+'/'+fileNameWithoutExtension+'.'+extension);
            }
            cb(null, file);
        });
    });
};

/** Return \ or /. */
function recognizeSlash(path) {
    return path.match(/[\/\\]/);
}

function getFileName(path) {
    return path.split(recognizeSlash(path)).pop();
}

function getFileExtension(path) {
    return path.split('.').pop();
}

function getFileNameWithoutExtension(path) {
    var parts = getFileName(path).split('.');
    parts.pop();
    return parts.join('.');
}

/** Returns path without ending slash. */
function getPathWithoutFileName(path) {
    var slash = recognizeSlash(path),
        parts = path.split(slash);
    parts.pop();
    return parts.join(slash);
}

/** Returns path without starting slash. */
function getRelativePath(path, pivot) {
    var slash = recognizeSlash(path),
        parts = path.split(slash + pivot + slash);
    return parts.pop();
}

/** Returns path without starting slash. */
function getRelativePathWithoutFileName(path, pivot) {
    var relativePath = getPathWithoutFileName(getRelativePath(path, pivot));
    return relativePath==='' ? '' : relativePath + recognizeSlash(path);
}

function normalizePath(path) {
    return path.replace(/\\/g, '/');
}

// function reporter is from gulp-diff plugin, but changed 
var reporter = function reporter(opts) {
    opts = opts || {};
    return through.obj(function(file, enc, cb) {
      if (file.diff && Object.keys(file.diff).length) {
        if (!opts.quiet) {
          console.log('\n' + clc.underline(file.path), '\n');
          console.log(file.diff.map(formatLine).join(''));
        }

        noErrors = false; // changed
        
        if (opts.fail) {
           this.emit('error', 'Files differ');
        }
      }
      return cb(null, file);
    });
  };
  
  function formatLine(part, i) {
    var indent = '    ';
    return (!i ? indent : '') + part.value.split('\n').map(function(ln) {
      return clc.black(clc[colorLine(part)](ln));
    }).join('\n' + indent);
  }
  
  function colorLine(ln) {
    if (ln.added) {
      return 'bgGreen';
    }
    if (ln.removed) {
      return 'bgRed';
    }
    return 'blackBright';
  }
const { src, dest, watch, series } = require("gulp");
const gulpEsbuild = require("gulp-esbuild");
const browserSync = require("browser-sync");
const { exec } = require('child_process');

const buildProductionJsOutputDistributionFromTypeScriptFiles = () => {
  return src("src/**/*.ts")
    .pipe(
      gulpEsbuild({
        outdir: "production",
        bundle: true,
        minify: true,
      })
    )
    .pipe(dest("./"));    
}

const writeIndexHtmlToProductionFolderChildProcessTask = async () => {
  await copyIndexHtmlToProductionFolder();
  await modifyIndexHtmlScriptSrcRef();
  // await removeIndexHtmlBackupCopy();
}

const copyIndexHtmlToProductionFolder = async () => {
  exec("cp ./src/index.html ./production/index.html", (error, stdout, stderr) => {
    if(error){
      Promise.reject(new Error(stderr));
    }
    Promise.resolve(stdout);
  });
}

const modifyIndexHtmlScriptSrcRef = async () => {
  exec(`sed -i -e 's|../bundle|.|g' ./production/index.html`, (error, stdout, stderr) => {
    if(error){
      Promise.reject(new Error(stderr));
    }
    Promise.resolve(stdout);
  });
}

const removeIndexHtmlBackupCopy = async () => {
  exec("rm ./production/index.html-e", (error, stdout, stderr) => {
    if(error){
      Promise.reject(new Error(stderr));
    }
    Promise.resolve(stdout);
  });
}

const runDevBuildTask = () => {
  initBrowserSync();
  watch("src/**/*.ts", { ignoreInitial: false }, transpileAndBundleTask);
}

const initBrowserSync = () => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "src/index.html",
    },
    notify: false,
    injectChanges: true,
  });
};

const transpileAndBundleTask = () =>
  src("src/**/*.ts")
    .pipe(
      gulpEsbuild({
        outdir: "bundle",
        bundle: true,
        minify: false,
      })
    )
    .pipe(dest("./"))
    .pipe(browserSync.reload({ stream: true }));

exports.runDevBuildTask = runDevBuildTask;
exports.createProductionDistributionTask = series(buildProductionJsOutputDistributionFromTypeScriptFiles, 
  writeIndexHtmlToProductionFolderChildProcessTask);
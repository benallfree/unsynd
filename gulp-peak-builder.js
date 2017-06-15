var Promise = require('promise');
var through = require('through2');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var exec = require('child_process').exec;
var tmp = require('tmp');
 

const PLUGIN_NAME = 'gulp-peak-builder';


module.exports = function() {

  return through.obj(function(file, enc, cb) {
    var self = this;

    var tmpobj = tmp.fileSync({postfix: '.json'});
    var cmd = `audiowaveform -i "${file.path}" -b 8 -o "${tmpobj.name}"`
    console.log(cmd)
    exec(cmd, function(error, stdout, stderr) {
      let samples = require(tmpobj.name).data;
      samples = samples.filter( (v)=> { return v>=0; })
      var peaks = [], size = samples.length/300;

      while (samples.length > 0)
      {
        var t = samples.splice(0, size).reduce( (a,v)=>{ return a+v;} );
        peaks.push((t/size/127.0).toFixed(4)*1)
      }
      
      file.contents = new Buffer(JSON.stringify(peaks));
      file.path = file.path.replace(/\.[^/.]+$/, ".json");
      self.push(file);
      cb();
    });
    return;
  });

};
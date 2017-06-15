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

    var tmpobj = tmp.fileSync({postfix: '.json', keep: true});
    var cmd = `audiowaveform -i "${file.path}" -b 8 -o "${tmpobj.name}"`
    console.log(cmd)
    exec(cmd, function(error, stdout, stderr) {
      let samples = require(tmpobj.name).data;
      samples = samples.filter( (v,i)=> { return i%2==1; })
      var peaks = [], size = samples.length/300;
      for(var i=0; i < samples.length; i+=2)
      {
        peaks.push(((Math.abs(samples[i])+samples[i+1])/256));
      }
      var final = [], size = peaks.length/300;
      console.log("size is", size);
      while(peaks.length>0)
      {
        var t = peaks.splice(0,size).reduce((a,v) => { return a+v; });
        final.push((t/size).toFixed(4)*1);
      }
      
      file.contents = new Buffer(JSON.stringify(final));
      file.path = file.path.replace(/\.[^/.]+$/, ".json");
      self.push(file);
      cb();
    });
    return;
  });

};
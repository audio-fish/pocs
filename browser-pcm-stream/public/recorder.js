(function(window) {
  var client = new BinaryClient('ws://localhost:9001');

  client.on('open', function() {
    window.Stream = client.createStream();

    if (!navigator.getUserMedia)
      navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
		var opts = {
			audio: {
				mandatory : {
					googEchoCancellation : false,
					googAutoGainControl: false,
					googNoiseSuppression: false,
					googHighpassFilter: false
				}
			}
		};
      navigator.getUserMedia(opts, success, function(e) {
        alert('Error capturing audio.');
      });
    } else alert('getUserMedia not supported in this browser.');

    var recording = false;

    window.startRecording = function() {
      recording = true;
    }

    window.stopRecording = function() {
      recording = false;
      window.Stream.end();
    }

    function success(e) {
      audioContext = window.AudioContext || window.webkitAudioContext;
      context = new audioContext();

      // the sample rate is in context.sampleRate
	  // this should be passed to the server on initiation and sanitized as an input to the wav recording
	  console.log('context.sampleRate', context.sampleRate);
      audioInput = context.createMediaStreamSource(e);
	  var gainNode = context.createGain();
	  gainNode.gain.value = 0.3

      var bufferSize = 2048;
      recorder = context.createScriptProcessor(bufferSize, 1, 1);

      recorder.onaudioprocess = function(e){
        if(!recording) return;
        console.log ('recording');
        var left = e.inputBuffer.getChannelData(0);
        window.Stream.write(convertoFloat32ToInt16(left));
      }

      audioInput.connect(gainNode);
	  gainNode.connect(recorder);
      recorder.connect(context.destination);
    }

    function convertoFloat32ToInt16(buffer) {
      var l = buffer.length;
      var buf = new Int16Array(l)

      while (l--) {
        buf[l] = buffer[l]*0xFFFF;    //convert to 16 bit
      }
      return buf.buffer
    }
  });
})(this);

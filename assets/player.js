/**
 * SoundManager 2: MPC (Drum Machine) demo
 */

var MPC = function() {
  this.keys = {'1':0,'2':1,'3':2,'4':3,'q':4,'w':5,'e':6,'r':7,'a':8,'s':9,'d':10,'f':11,'z':12,'x':13,'c':14,'v':15}

  // scope within these event handler methods: "this" = SMSound() object instance (see SMSound() in soundmanager.js for reference) 

  this.showProgress = function() {
  }

  this.onload = function() {
  }

  this.onfinish = function() {
  }

  this.onplay = function() {
  }

  this.whileplaying = function() {
  }

  this._keyHandler = function(e) {
  }

  this._showStatus = function(sID,n1,n2) {
  }

  this._getButton = function(sID) {

  }

  this._reset = function(sID) {

  }

  this.init = function() {

  }

}

var mpc = new MPC();

soundManager.flashVersion = (window.location.toString().match(/#flash8/i)?8:9);
if (soundManager.flashVersion != 8) {
  soundManager.useHighPerformance = true;
}

soundManager.setup({
  url: '../../swf/', // path to load SWF from (overriding default)
  bgColor: '#333333',
  wmode: 'transparent',
  debugMode: false,
  preferFlash: false,
  html5PollingInterval: 50,
  onready: function() {

    soundManager.setup({
      defaultOptions: {
        autoLoad: true,
        multiShot: true,
        whileloading: mpc.showProgress,
        onid3: mpc.onid3,
        onload: mpc.onload,
        onplay: mpc.onplay,
        whileplaying: mpc.whileplaying,
        onfinish: mpc.onfinish
      }
    });

    // This is the "onload" equivalent which is called when SoundManager has been initialised (sounds can be created, etc.)
    mpc.init();

    var soundURLs = 'AMB_BD_1,AMB_FTM2,AMB_HHCL,AMB_HHOP,AMB_HHPD,AMB_HTM,AMB_LTM2,AMB_MTM,AMB_RIM1,AMB_SN13,AMB_SN_5,CHINA_1,CRASH_1,CRASH_5,CRASH_6,RIDE_1'.split(',');
    for (var i=0; i<soundURLs.length; i++) {
      soundManager.createSound({
        id: 's'+i,
        url: 'assets/sounds/'+soundURLs[i]+'.mp3'
      });
    }

    /**
     * createSound options can also be set on a per-file basis, with specific option overrides.
     * (Options not specified here will inherit defaults as defined in soundManager.defaultOptions.)
     *
     * eg.
     *
     * soundManager.createSound({
     *  id: 'mySound',
     *  url: '/path/to/some.mp3',
     *  stream: true,
     *  autoPlay: true,
     *  multiShot: false,
     *  whileloading: function() { alert('sound '+this.id+': '+this.bytesLoaded+' of '+this.bytesTotal+' bytes loaded.'); } // event handler: "this" is scoped to SMSound() object instance for easy access to methods/properties
     * });
     *
     * - OR -
     *
     * If you just want a sound with all default options, you can also specify just the required id and URL as string parameters:
     *
     * soundManager.createSound('mySound','/path/to/some.mp3');
     */
  }
});

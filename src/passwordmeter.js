;(function(window, document) {
    
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  };
  
  var test = function(  ) {
    var regexTests = [
      /[a-z]+/,
      /[A-Z]+/,
      /[0-9]+/,
      /[$@#&!]+/
    ];
    
    var passes = 0;
    
    for( var i = 0; i < regexTests.length; i++ ) {
      if( regexTests[i].test( this.value ) ) {
        passes++;
      }
    }
    
    var string = options.weakString;
    var percent = 0;
    var color = options.weakColor;
    
    if( passes >= 2 && passes < 4 ) {
      string = options.goodString;
      color = options.goodColor;
      percent = 50;
    }
    else if( passes === 4 ) {
      string = options.strongString;
      color = options.strongColor;
      percent = 100;
    }
    
    return { string, color, percent };
  }

  function passwordmeter(selector, options) {
    this.elements = document.querySelectorAll(selector);
    
    this.options = {
      weakString: 'Weak',
      weakColor: 'red',
      goodString: 'Good',
      goodColor: 'yellow',
      strongString: 'Strong',
      strongColor: 'green'
    };
        
    if( options.test && {}.toString.call( options.test ) === '[object Function]') {
      this.options.test = options.test;
    }
    
    this.buildHTML();
    this.addEvents();
  }
  
  passwordmeter.prototype.buildHTML = function() {
    if( this.elements.length ) {
      for( var i = 0; i < this.elements.length; i++ ) {
        var item = this.elements[i];
        
        var container = document.createElement('div');
        container.classList.add( 'strength-container' );
        
        var progressbar = document.createElement( 'div' );
        var progressbarInner = document.createElement( 'div' );
        
        progressbarInner.style.width = 0;
        progressbarInner.style.height = "100%";
        progressbarInner.style.position = "absolute";
        progressbarInner.style.top = 0;
        progressbarInner.style.left = 0;
        progressbarInner.style.backgroundColor = 'red';
        progressbarInner.style.transition = "all 2s ease";
        
        
        progressbar.appendChild( progressbarInner );
        
        progressbar.max = 100;
        progressbar.value = 0;
        progressbar.low = 33;
        progressbar.high = 66;
        progressbar.optimum = 80;
        progressbar.style.height = '32px';
        progressbar.style.width = "100%";
        progressbar.style.backgroundColor = "grey";
        progressbar.style.position = "relative";
        
        container.appendChild( progressbar );
        
        item.parentNode.insertBefore( container, item.nextSibling );
        
      }
    }
  };

  passwordmeter.prototype.addEvents = function() {
    if( this.elements.length ) {
      for( var i = 0; i < this.elements.length; i++ ) {
        var item = this.elements[i];
        item.addEventListener( 'input', this.testPassword.bind(item, this.options ), false );
        
      }
    }
  };
  
  passwordmeter.prototype.testPassword = function( options ) {
    const { string, color, percent } = options;
    
    var container = this.parentNode.querySelector('.strength-container');
    var progressbar = container.childNodes[0];
    var progressbarInner = progressbar.childNodes[0];
    
    progressbarInner.style.backgroundColor = color;
    progressbarInner.style.width = percent + "%";
  };
  
  window.passwordMeter = passwordmeter;

})(window, document);

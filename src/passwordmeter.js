;(function(window, document) {
  
  Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
  };

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
    
    this.buildHTML();
    this.addEvents();
  }
  
  passwordmeter.prototype.buildHTML = function() {
    if( this.elements.length ) {
      for( let i = 0; i < this.elements.length; i++ ) {
        const item = this.elements[i];
        
        const container = document.createElement('div');
        container.classList.add( 'strength-container' );
        
        const progressbar = document.createElement( 'progress' );
        
        progressbar.max = 100;
        progressbar.value = 0;
        progressbar.innerHTML = "0";
        progressbar.style.width = "100%";
        
        container.appendChild( progressbar );
        
        item.parentNode.insertBefore( container, item.nextSibling );
      }
    }
  };

  passwordmeter.prototype.addEvents = function() {
    if( this.elements.length ) {
      for( let i = 0; i < this.elements.length; i++ ) {
        const item = this.elements[i];
        item.addEventListener( 'input', this.testPassword.bind(item, this.options ), false );
        
      }
    }
  };
  
  passwordmeter.prototype.testPassword = function( options ) {
    const regexTests = [
      /[a-z]+/,
      /[A-Z]+/,
      /[0-9]+/,
      /[$@#&!]+/
    ];
    let passes = 0;
  
    for( let i = 0; i < regexTests.length; i++ ) {
      if( regexTests[i].test( this.value ) ) {
        passes++;
      }
    }
    
    let string = options.weakString;
    let percent = 0;
    let color = options.weakColor;
    
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
    
    let progressbar = this.parentNode.querySelector('progress');
    
    console.log( progressbar.parentNode );
    
    let status = progressbar.parentNode.querySelector('p');
    
    if( status ) {
      status.remove();  
    }
    
    
    status = document.createElement( 'p' );
    status.innerHTML = "Strength: " + string;
    
    progressbar.parentNode.insertBefore( status, progressbar );
    
    progressbar.value = percent;
    progressbar.style.backgroundColor = color;
  };
  
  window.passwordMeter = passwordmeter;

})(window, document);

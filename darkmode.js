function darkmode() {
   var element = document.body;
   element.classList.toggle("dark-mode");
}

 //Automatic Switch to Dark or Lite
  function autoModeSwitch() {
    var element = document.body;
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      // dark mode
      element.classList.toggle("dark-mode");
      document.getElementById("modeSwitch").checked = true;
    }
  }
  autoModeSwitch();
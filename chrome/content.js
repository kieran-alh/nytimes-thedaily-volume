function setVolume()
{
    var audio = document.querySelector("audio");
    audio.volume = this.value / 100;
    if (audio.volume > 0)
        audio.muted = false
}
function createSlider()
{
    var volumeSlider = document.createElement("input");
    volumeSlider.id = "volume-control";
    volumeSlider.type = "range";
    volumeSlider.min = 0;
    volumeSlider.max = 100;
    volumeSlider.step = 1;
    volumeSlider.value = 50;
    volumeSlider.style.margin = "10px";
    volumeSlider.addEventListener("change", setVolume);
    volumeSlider.addEventListener("input", setVolume);
    return volumeSlider;
}
function insertSlider(container, audio)
{
    audio.volume = 0.5;
    audio.addEventListener("volumechange", function() {
        if (audio.volume === 0 || audio.muted) 
            audio.muted = true;
        else
            audio.muted = false;
    });

    var volumeSlider = createSlider();  
    container.appendChild(volumeSlider);

    var muteBtn = container.querySelector('button[class*="volume-"]');
    muteBtn.addEventListener('click', function() {
        var currentVolume = audio.volume * 100;
        if (audio.muted)
            currentVolume = 0;
        volumeSlider.value = currentVolume;
    })
}
var observer = new MutationObserver(function(mutations, observer) {
    var container = document.querySelector('[class*="volumeContainer-"]');
    var audio = document.querySelector('audio')
    if (container && audio) {
        insertSlider(container, audio);
        observer.disconnect();
        return;
    }
})
observer.observe(document.getElementById('app'), {
    childList: true,
    subtree: true
})
class SoundManager{
    playSound(source, loop = false, volume = 1) {
        let audio = new Audio();
        let src = document.createElement("source");
        src.type = "audio/mpeg";
        src.src = source;
        audio.appendChild(src);
        audio.loop = loop;
        audio.volume = volume;
        audio.play().then();
    }
}
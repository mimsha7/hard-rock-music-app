const searchSongs = async () => {
   const searchInput = document.getElementById('searchInput').value;
    const url = `https://api.lyrics.ovh/suggest/${searchInput}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    } catch (error) {
        displayError('Something went wrong! Please try again later.');
    }
}

const displaySongs = songs => {
    const songInfo = document.getElementById('song-Info');
    songInfo.innerHTML = ``;
    
    songs.forEach(song => {
    const songItems = song.artist;
    const songDiv = document.createElement('div');
    songDiv.className = 'single-result row align-items-center my-3 p-3'
    songDiv.innerHTML = `
    <div class="col-md-9">
        <h3 class="lyrics-name">${song.title}</h3>
        <p class="author lead">Album by <span>${songItems.name}</span></p>
        <audio controls>
            <source src="${song.preview}" type="audio/mpeg">
        </audio>
    </div>
    <div class="col-md-3 text-md-right text-center">
        <button onclick="getLyrics('${songItems.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
    </div>
    `;
    songInfo.appendChild(songDiv);
});
}

const getLyrics = async (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    } catch (error) {
        displayError('Something went wrong! Please try again later.');
    }
}

const displayLyrics = lyrics => {
   const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyrics;
}

const displayError = error => {
    const errMsg = document.getElementById('err-msg');
    errMsg.innerText = error;
}


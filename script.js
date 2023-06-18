document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.getElementById('search-box');
  const channelList = document.getElementById('channel-list');
  const player = document.getElementById('player');
  const githubRawURL = 'JIO_DARSHAN2.m3u';

  let channels = [];

  fetch(githubRawURL)
    .then(response => response.text())
    .then(contents => {
      channels = parseM3UFile(contents);
      populateChannelList(channels);
      setupChannelChangeHandler();
    })
    .catch(error => console.error('Error fetching or parsing M3U file:', error));

  searchBox.addEventListener('input', function() {
    const searchQuery = searchBox.value.toLowerCase();
    const filteredChannels = channels.filter(channel => channel.name.toLowerCase().includes(searchQuery));
    populateChannelList(filteredChannels);
  });

  function parseM3UFile(contents) {
    const lines = contents.split('\n');
    const channels = [];

    let channelName = '';
    let channelLink = '';

    for (let line of lines) {
      line = line.trim();

      if (line.startsWith('#EXTINF:')) {
        // Extract the channel name from the line
        const nameStartIndex = line.indexOf(',') + 1;
        channelName = line.substring(nameStartIndex).trim();
      } else if (line && !line.startsWith('#')) {
        // Assume any non-empty, non-comment line is a channel link
        channelLink = line.trim();
        channels.push({ name: channelName, link: channelLink });
      }
    }

    return channels;
  }

  function populateChannelList(channels) {
    channelList.innerHTML = ''; // Clear previous options

    channels.forEach(function(channel) {
      const option = document.createElement('option');
      option.textContent = channel.name;
      option.value = channel.link;
      channelList.appendChild(option);
    });
  }

  function setupChannelChangeHandler() {
    channelList.addEventListener('change', function() {
      const selectedLink = channelList.value;
      player.src = selectedLink;
    });
  }
});

import m_191 from './m_191_easy.rs';
import m_192 from './m_192_easy.rs';
import m_193 from './m_193_easy.rs';
import m_194 from './m_194_easy.rs';
import m_195 from './m_195_easy.rs';

let arr = [m_191, m_192, m_193, m_194, m_195];

let nijigasakiEasyBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => nijigasakiEasyBeatmap.push(data));
});

export default nijigasakiEasyBeatmap;

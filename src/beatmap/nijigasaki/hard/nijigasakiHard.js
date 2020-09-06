import m_191 from './m_191_hard.rs';
import m_192 from './m_192_hard.rs';
import m_193 from './m_193_hard.rs';
import m_194 from './m_194_hard.rs';
import m_195 from './m_195_hard.rs';

let arr = [m_191, m_192, m_193, m_194, m_195];

let nijigasakiHardBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => nijigasakiHardBeatmap.push(data));
});

export default nijigasakiHardBeatmap;

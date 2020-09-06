import m_191 from './m_191_normal.rs';
import m_192 from './m_192_normal.rs';
import m_193 from './m_193_normal.rs';
import m_194 from './m_194_normal.rs';
import m_195 from './m_195_normal.rs';

let arr = [m_191, m_192, m_193, m_194, m_195];

let nijigasakiNormalBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => nijigasakiNormalBeatmap.push(data));
});

export default nijigasakiNormalBeatmap;

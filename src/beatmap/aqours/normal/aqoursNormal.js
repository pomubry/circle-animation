import m_087 from './m_087_normal.rs';
import m_091 from './m_091_normal.rs';
import m_096 from './m_096_normal.rs';
import m_107 from './m_107_normal.rs';
import m_108 from './m_108_normal.rs';

let arr = [m_087, m_091, m_096, m_107, m_108];

let aqoursNormalBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => aqoursNormalBeatmap.push(data));
});

export default aqoursNormalBeatmap;

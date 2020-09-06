import m_087 from './m_087_hard.rs';
import m_091 from './m_091_hard.rs';
import m_096 from './m_096_hard.rs';
import m_107 from './m_107_hard.rs';
import m_108 from './m_108_hard.rs';

let arr = [m_087, m_091, m_096, m_107, m_108];

let aqoursHardBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => aqoursHardBeatmap.push(data));
});

export default aqoursHardBeatmap;

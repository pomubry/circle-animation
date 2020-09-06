import m_001 from './m_001_normal.rs';
import m_002 from './m_002_normal.rs';
import m_003 from './m_003_normal.rs';
import m_004 from './m_004_normal.rs';
import m_005 from './m_005_normal.rs';

let arr = [m_001, m_002, m_003, m_004, m_005];

let aqoursNormalBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => aqoursNormalBeatmap.push(data));
});

export default aqoursNormalBeatmap;

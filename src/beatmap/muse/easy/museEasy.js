import m_001 from './m_001_easy.rs';
import m_002 from './m_002_easy.rs';
import m_003 from './m_003_easy.rs';
import m_004 from './m_004_easy.rs';
import m_005 from './m_005_easy.rs';

let arr = [m_001, m_002, m_003, m_004, m_005];

let museEasyBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => museEasyBeatmap.push(data));
});

export default museEasyBeatmap;

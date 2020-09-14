import m_001 from './m_001_easy.rs';
import m_002 from './m_002_easy.rs';
import m_003 from './m_003_easy.rs';
import m_004 from './m_004_easy.rs';
import m_005 from './m_005_easy.rs';
import m_006 from './m_006_easy.rs';
import m_007 from './m_007_easy.rs';
import m_008 from './m_008_easy.rs';
import m_009 from './m_009_easy.rs';
import m_010 from './m_010_easy.rs';

let arr = [
  m_001,
  m_002,
  m_003,
  m_004,
  m_005,
  m_006,
  m_007,
  m_008,
  m_009,
  m_010,
];

let museEasyBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => museEasyBeatmap.push(data));
});

export default museEasyBeatmap;

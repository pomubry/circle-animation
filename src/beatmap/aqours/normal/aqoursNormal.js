import m_087 from './m_087_normal.rs';
import m_091 from './m_091_normal.rs';
import m_096 from './m_096_normal.rs';
import m_107 from './m_107_normal.rs';
import m_108 from './m_108_normal.rs';
import m_109 from './m_109_normal.rs';
import m_112 from './m_112_normal.rs';
import m_113 from './m_113_normal.rs';
import m_114 from './m_114_normal.rs';
import m_115 from './m_115_normal.rs';
import m_116 from './m_116_normal.rs';
import m_117 from './m_117_normal.rs';
import m_118 from './m_118_normal.rs';
import m_119 from './m_119_normal.rs';
import m_120 from './m_120_normal.rs';
import m_121 from './m_121_normal.rs';
import m_122 from './m_122_normal.rs';
import m_124 from './m_124_normal.rs';
import m_125 from './m_125_normal.rs';
import m_127 from './m_127_normal.rs';

let arr = [
  m_087,
  m_091,
  m_096,
  m_107,
  m_108,
  m_109,
  m_112,
  m_113,
  m_114,
  m_115,
  m_116,
  m_117,
  m_118,
  m_119,
  m_120,
  m_121,
  m_122,
  m_124,
  m_125,
  m_127,
];

let aqoursNormalBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => {
      let reg = /m_[0-9]{3}/;
      let match = path.match(reg);
      data.code = match[0];
      aqoursNormalBeatmap.push(data);
    });
});

export default aqoursNormalBeatmap;

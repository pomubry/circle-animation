import m_001 from './m_001_normal.rs';
import m_002 from './m_002_normal.rs';
import m_003 from './m_003_normal.rs';
import m_004 from './m_004_normal.rs';
import m_005 from './m_005_normal.rs';
import m_006 from './m_006_normal.rs';
import m_007 from './m_007_normal.rs';
import m_008 from './m_008_normal.rs';
import m_009 from './m_009_normal.rs';
import m_010 from './m_010_normal.rs';
import m_011 from './m_011_normal.rs';
import m_012 from './m_012_normal.rs';
import m_013 from './m_013_normal.rs';
import m_014 from './m_014_normal.rs';
import m_015 from './m_015_normal.rs';
import m_016 from './m_016_normal.rs';
import m_017 from './m_017_normal.rs';
import m_018 from './m_018_normal.rs';
import m_019 from './m_019_normal.rs';
import m_020 from './m_020_normal.rs';

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
  m_011,
  m_012,
  m_013,
  m_014,
  m_015,
  m_016,
  m_017,
  m_018,
  m_019,
  m_020,
];

let museNormalBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => {
      let reg = /m_[0-9]{3}/;
      let match = path.match(reg);
      data.code = match[0];
      museNormalBeatmap.push(data);
    });
});
export default museNormalBeatmap;

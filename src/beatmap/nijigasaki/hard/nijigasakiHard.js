import m_191 from './m_191_hard.rs';
import m_192 from './m_192_hard.rs';
import m_193 from './m_193_hard.rs';
import m_194 from './m_194_hard.rs';
import m_195 from './m_195_hard.rs';
import m_196 from './m_196_hard.rs';
import m_197 from './m_197_hard.rs';
import m_198 from './m_198_hard.rs';
import m_199 from './m_199_hard.rs';

let arr = [m_191, m_192, m_193, m_194, m_195, m_196, m_197, m_198, m_199];

let nijigasakiHardBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => {
      let reg = /m_[0-9]{3}/;
      let match = path.match(reg);
      data.code = match[0];
      nijigasakiHardBeatmap.push(data);
    });
});

export default nijigasakiHardBeatmap;

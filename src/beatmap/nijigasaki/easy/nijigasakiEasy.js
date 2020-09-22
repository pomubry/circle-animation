import m_191 from './m_191_easy.rs';
import m_192 from './m_192_easy.rs';
import m_193 from './m_193_easy.rs';
import m_194 from './m_194_easy.rs';
import m_195 from './m_195_easy.rs';
import m_196 from './m_196_easy.rs';
import m_197 from './m_197_easy.rs';
import m_198 from './m_198_easy.rs';
import m_199 from './m_199_easy.rs';

let arr = [m_191, m_192, m_193, m_194, m_195, m_196, m_197, m_198, m_199];

let nijigasakiEasyBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => {
      let reg = /m_[0-9]{3}/;
      let match = path.match(reg);
      data.code = match[0];
      nijigasakiEasyBeatmap.push(data);
    });
});

export default nijigasakiEasyBeatmap;

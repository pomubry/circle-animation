import m_087 from './m_087_easy.rs';
import m_091 from './m_091_easy.rs';
import m_096 from './m_096_easy.rs';
import m_107 from './m_107_easy.rs';
import m_108 from './m_108_easy.rs';

let arr = [m_087, m_091, m_096, m_107, m_108];

let aqoursEasyBeatmap = [];
arr.forEach((path) => {
  fetch(path)
    .then((rs) => rs.json())
    .then((data) => aqoursEasyBeatmap.push(data));
});

export default aqoursEasyBeatmap;

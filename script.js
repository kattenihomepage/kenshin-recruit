const jobTiles = document.querySelectorAll('.job-tile');
jobTiles.forEach(tile => {
  const summary = tile.querySelector('.job-summary');
  const detail = tile.querySelector('.job-detail');
  const icon = tile.querySelector('.toggle-icon');

  summary.addEventListener('click', function(){
    const isOpen = detail.classList.contains('open');
    if (isOpen) {
      detail.style.maxHeight = null;
      detail.classList.remove('open');
      icon.textContent = '＋';
    } else {
      detail.style.maxHeight = (detail.scrollHeight + 100) + "px";
      detail.classList.add('open');
      icon.textContent = '－';

    // 一旦既存のtransitionendリスナーを削除してから追加することで多重登録防止
    detail.removeEventListener('transitionend', scrollAfterExpand);
    detail.addEventListener('transitionend', scrollAfterExpand);
  }
});


function scrollAfterExpand(e) {
  if (e.propertyName === 'max-height') {
    const tile = e.target.closest('.job-tile');
    const tileRect = tile.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    // タイルが画面内に収まらない場合だけスクロールする
    if (tileRect.bottom > viewportHeight || tileRect.top < 0) {
      // スクロール量: タイルの上端位置 + タイルの高さ - ビューポート高さ + 20px余白
      const scrollY = window.scrollY + tileRect.top;
      window.scrollTo({
        top: scrollY,
        behavior: 'smooth'
      });
    }

    e.target.removeEventListener('transitionend', scrollAfterExpand);
  }
}

// 応募ボタン
const applyButtons = document.querySelectorAll('.applyBtn');
const modal = document.getElementById('modal');
const closeModal = document.getElementById('closeModal');
const strategyText = document.getElementById('strategy-text');

applyButtons.forEach(btn => {
  btn.addEventListener('click', function(e){
    e.stopPropagation();
    modal.style.display = 'block';

    // 戦略開示
    strategyText.innerHTML = "<strong>【戦略】</strong><br>北信濃攻略後、武田信玄を川中島へ誘い込み、別動隊にて背後を衝く。軍師による夜襲策と、謙信公直々の騎馬突撃をもって勝利を掴む。";
  });
});

closeModal.addEventListener('click', function(){
  modal.style.display = 'none';
});

// モーダル外クリックで閉じる
window.addEventListener('click', function(e){
  if (e.target == modal) {
    modal.style.display = 'none';
  }
});

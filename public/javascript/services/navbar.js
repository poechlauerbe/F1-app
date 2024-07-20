function toggleSubnav (subnavId) {
  const subnav = document.getElementById(subnavId);
  if (subnav.style.display === 'none' || subnav.style.display === '') {
    subnav.style.display = 'block';
  } else {
    subnav.style.display = 'none';
  }
} // eslint-disable-line no-unused-vars

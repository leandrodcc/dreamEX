// smooth arrow:
const scrollArrow = document.querySelector('.arrow-scroll')
scrollArrow.addEventListener('click', ev => {
	ev.preventDefault()
	const href = scrollArrow.getAttribute('href')
	document.querySelector(href).scrollIntoView({
		behavior: 'smooth'
	})
})

// 3d cube rotation:
const cubeMove = (ev) => {
  const x = ev.pageX
  const y = ev.pageY
  const midX = x - window.innerWidth / 2
  const midY = y - window.innerHeight / 2
  const cube = document.querySelector('.cube')
  const boundaries = cube.getBoundingClientRect()
  cube.style.x = Math.max(boundaries.left, Math.min(boundaries.right, x)) + 'px'
	cube.style.y = Math.max(boundaries.top, Math.min(boundaries.bottom, y)) + 'px'
  cube.style.transform = `rotateX(${midY * 0.5}deg) rotateY(${midX * 0.5}deg)`
}

document.addEventListener('mousemove', (ev) => {
	cubeMove(ev)
})

document.addEventListener('touchmove', (ev) => {
	cubeMove(ev)
})

// bg color changes:
inView('.testimonials')
    .on('enter', section => {
  		section.classList.add('pink-bg')
		})
    .on('exit', section => {
      section.classList.remove('pink-bg')
    });

inView('footer')
    .on('enter', section => {
  		section.classList.add('lilac-bg')
		})
    .on('exit', section => {
      section.classList.remove('lilac-bg')
    });

inView.threshold(0.2)

// fadein fadeout:
const fadedTags = document.querySelectorAll('section img, .try-out h1, .what-is h1, .try-out h2, .try-out p, .what-is p, li')

fadedTags.forEach(tag => {
  tag.style.opacity = 0
})

const fadeIn = () => {
  let delay = 0.20
  fadedTags.forEach(tag => {
    const tagTop = tag.getBoundingClientRect().top
    const tagBottom = tag.getBoundingClientRect().bottom
    if (tagTop < window.innerHeight && tagBottom > 0) {
    	tag.style.animation = `fadein 1s ${delay}s both`
      delay = delay + 0.20
    } else {
      tag.style.opacity = 0
      tag.style.animation = ''
    }
  })
}

fadeIn()

document.addEventListener('scroll', () => {
  fadeIn()
})

window.addEventListener('resize', () => {
  fadeIn()
})

// chamomille parallax:
const paraSection = document.querySelector(".try-out")
const addMovement = () => {
  const topViewport = window.pageYOffset
  const midViewport = topViewport + (window.innerHeight / 2)
  const topSection = paraSection.offsetTop
  const midSection = topSection + (paraSection.offsetHeight / 2)
// how far away is the section from the visible area:
  const distanceToSection = midViewport - midSection
  const chamomille = paraSection.querySelector('.parallax')
  let contentDist = -1 * distanceToSection / 2
  chamomille.style.top = `${contentDist}px`
}

addMovement()

document.addEventListener('scroll', () => {
  addMovement()
})

window.addEventListener('resize', () => {
  addMovement()
})

// ingredient boxes:
const ingredients = document.querySelectorAll('.ingredient-title')
const ingredientInfo = [
  {info: 'derived from valerian polyphenols, vitamin EX is a newly discovered vitamin which sends sleep-inducing neurological messages to the brain. it is perfectly safe.'},
  {info: 'known for its soothing properties, our formula uses top-grade chamomille harvested from the lush fields of France, to provide an immersive, calming effect.'},
  {info: `a wide complex of synthesized melatonin sources, each one with different molecular sizes to increase the body's natural levels. it is also perfectly safe.`}
]

ingredients.forEach((ing, i) => {
  const ingBox = document.querySelector('.ingredient-container')
  const ingTitle = document.querySelector('.ingredient-box h2')
  const ingContent = document.querySelector('.ingredient-box p')
  const ingCloser = document.querySelector('.ingredient-closer')
  ing.addEventListener('click', ev => {
    ev.preventDefault()
    ingBox.classList.toggle('reveal')
    const newTitle = ing.textContent
		ingTitle.innerHTML = newTitle
    ingContent.innerHTML = ingredientInfo[i].info
	})
  ingCloser.addEventListener('click', event => {
    ingBox.classList.remove('reveal')
  })
})

// mobile header:
const mobileOpener = document.querySelector('.mobile-header-sq')
const mobileNav = document.querySelector('.mobile-nav')
const mobileHeader = document.querySelector('.mobile-header')

mobileOpener.addEventListener('click', ev => {
  ev.preventDefault()
	mobileNav.classList.toggle('header-slide')
  mobileHeader.classList.toggle('header-fix')
  if (mobileNav.classList.contains('header-slide')) {
    mobileOpener.style.transform = 'rotate(135deg)'
  } else {
    mobileOpener.style.transform = 'rotate(0deg)'
  }
})
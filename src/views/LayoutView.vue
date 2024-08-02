<template>
  <div class="layout-wrapper layout-content-navbar">
    <div class="layout-container">
      <SideBar />
      <div class="layout-page">
        <TopBar />
        <div class="content-wrapper">
          <RouterView />

          <FooterBar />

          <div class="content-backdrop fade"></div>
        </div>
      </div>
    </div>

    <div class="layout-overlay layout-menu-toggle"></div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import SideBar from '@/components/SideBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import { onMounted, ref } from 'vue'

export default {
  name: 'LayoutView',
  components: {
    TopBar,
    SideBar,
    FooterBar
  },
  setup() {
    const layoutMenu = ref(null)
    onMounted(() => {
      // Initialize menu
      const layoutMenuEl = document.querySelectorAll('#layout-menu')
      layoutMenuEl.forEach(function (element) {
        const menu = new Menu(element, {
          orientation: 'vertical',
          closeChildren: false
        })
        // Change parameter to true if you want scroll animation
        window.Helpers.scrollToActive(false)
        window.Helpers.mainMenu = menu
      })

      // Initialize menu togglers and bind click on each
      const menuToggler = document.querySelectorAll('.layout-menu-toggle')
      menuToggler.forEach((item) => {
        item.addEventListener('click', (event) => {
          event.preventDefault()
          window.Helpers.toggleCollapsed()
        })
      })

      // Display menu toggle (layout-menu-toggle) on hover with delay
      const delay = (elem, callback) => {
        let timeout = null
        elem.onmouseenter = () => {
          if (!window.Helpers.isSmallScreen()) {
            timeout = setTimeout(callback, 300)
          } else {
            timeout = setTimeout(callback, 0)
          }
        }

        elem.onmouseleave = () => {
          document.querySelector('.layout-menu-toggle').classList.remove('d-block')
          clearTimeout(timeout)
        }
      }

      const layoutMenuElement = document.getElementById('layout-menu')
      if (layoutMenuElement) {
        delay(layoutMenuElement, () => {
          if (!window.Helpers.isSmallScreen()) {
            document.querySelector('.layout-menu-toggle').classList.add('d-block')
          }
        })
      }

      // Display in main menu when menu scrolls
      const menuInnerContainer = document.getElementsByClassName('menu-inner')
      const menuInnerShadow = document.getElementsByClassName('menu-inner-shadow')[0]
      if (menuInnerContainer.length > 0 && menuInnerShadow) {
        menuInnerContainer[0].addEventListener('ps-scroll-y', function () {
          if (this.querySelector('.ps__thumb-y').offsetTop) {
            menuInnerShadow.style.display = 'block'
          } else {
            menuInnerShadow.style.display = 'none'
          }
        })
      }

      // Init BS Tooltip
      const tooltipTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="tooltip"]')
      )
      tooltipTriggerList.map((tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl))

      // Accordion active class
      const accordionActiveFunction = (e) => {
        if (e.type === 'show.bs.collapse' || e.type === 'hide.bs.collapse') {
          e.target.closest('.accordion-item').classList.toggle('active')
        }
      }

      const accordionTriggerList = [].slice.call(document.querySelectorAll('.accordion'))
      accordionTriggerList.forEach((accordionTriggerEl) => {
        accordionTriggerEl.addEventListener('show.bs.collapse', accordionActiveFunction)
        accordionTriggerEl.addEventListener('hide.bs.collapse', accordionActiveFunction)
      })

      // Auto update layout based on screen size
      window.Helpers.setAutoUpdate(true)

      // Toggle Password Visibility
      window.Helpers.initPasswordToggle()

      // Manage menu expanded/collapsed with templateCustomizer & local storage
      if (window.Helpers.isSmallScreen()) {
        return
      }

      window.Helpers.setCollapsed(true, false)
    })

    return {
      layoutMenu
    }
  }
}
</script>

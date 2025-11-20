<template>
  <footer class="links-container">
    <div>
      <div class="webrings">
        webrings:
        <div className="webring-links">
          <a
            href="https://webring.bucketfish.me/redirect.html?to=prev&name=whale-mom"
            target="_blank"
            >prev</a
          >
          <a target="_blank" href="https://webring.bucketfish.me"
            >🌈 bucket webring 🌈</a
          >
          <a
            href="https://webring.bucketfish.me/redirect.html?to=next&name=whale-mom"
            target="_blank"
            >next</a
          >
        </div>
        <div></div>
      </div>
      <div class="links">
        <a href="mailto:alliecaton3@gmail.com">alliecaton3@gmail.com</a> |
        <a class="link" href="https://github.com/alliecaton" target="blank"
          >github</a
        >
        |
        <a class="link" href="https://alliecaton.com" target="blank"
          >portfolio</a
        >
        |
        <a
          class="link"
          href="https://www.linkedin.com/in/alliecaton/"
          target="blank"
          >linkedin</a
        >
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.links-container {
  display: flex;
  gap: 10px;
  font-size: 12px;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
}

.webring-links {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.webrings {
  border: 1px dotted $purple;
  border-radius: 4px;
  padding: 10px 20px;
  margin-bottom: 20px;
}
</style>

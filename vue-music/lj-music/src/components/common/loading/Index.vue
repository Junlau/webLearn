<template>
    <div class="loading">
        <div class="loader"></div>
        <span v-if="loadingText != ''">{{ loadingText }}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    props: {
        loadingText: {
            type: String,
            default: '努力加载中...'
        }
    }
}
</script>

<style>
.loading {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading span {
    margin-top: 20px;
    font-size: 12px;
}

.loading .loader {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin: 3em;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  background: #fa2b00;
}

.loader,
.loader:before,
.loader:after {
  animation: loader 1s infinite ease-in-out;
}
.loader:before,
.loader:after {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
}
@keyframes loader {
  from {
    transform: scale(0);
    opacity: 1;
  }
  to {
    transform: scale(1);
    opacity: 0;
  }
}

</style>

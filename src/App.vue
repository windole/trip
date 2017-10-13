<template>
    <div id="app">
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import 'common/stylus/variable';
    #app
        color: $color-theme
        height: 100%
    ::-webkit-scrollbar
        display: none
</style>

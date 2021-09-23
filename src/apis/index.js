const apis = {
  upload: {
    description: '上传文件',
    action: 'upload',
    callback: 'uploadCallback',
    restrict: true
  },
  choseImg: {
    description: '从相册选取或拍摄照片及视频',
    action: 'choseImg',
    callback: 'choseImgCallback',
    restrict: true
  },
  choseFile: {
    description: '选择文件',
    action: 'choseFile',
    callback: 'choseFileCallback',
    restrict: true
  },
  socialLogin:{
    description: '第三方登录',
    action: 'socialLogin',
    callback: 'socialLoginCallback',
    restrict: true
  },
  scan:{
    description: '扫描二维码',
    action: 'scan',
    callback: 'scanCallback',
    restrict: true
  },
  optionMenu:{
    description: '点击标题栏右侧按钮',
    callback: 'optionMenu'
  }
}

export default apis;

const data = {
  department: {
    id: 10000,
    name: "大草原维保公司",
    level: 0,
    parent_id: 0,
    children: [
      {
        id: 10001,
        name: "总办",
        level: 1,
        parent_id: 10000,
        members: [
          {
            id: 20001,
            realname: "李一能",
            nickname: "异能",
            avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erPBCMmO9p0Exn0fyMrKEqKD3ZticDEf9ic8XXfhJfdg7I5aUQGic0244fao1t5RY9mxPqdwnVNVtA4A/132",
            summit: true
          },
          {
            id: 20002,
            realname: "王鑫",
            nickname: "欣欣",
            position: "财务总监",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/eddbbfad1d84110acccba198220155d0/fc1789fb-8d15-4440-ad8e-6e9f88bf0c2a.jpeg"
          },
          {
            id: 20005,
            realname: "年煜",
            nickname: "年火日立",
            position: "秘书长",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/c008767ae8170141698d64baa5327485/f0ce1d52-2235-4575-a259-d4d032b30134.jpeg"
          },
          {
            id: 20007,
            realname: "奥顿木齐尔",
            nickname: "诸葛钢铁",
            position: "总裁助理",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/bb29618591ba9f9cb94a615b477e7337/3766d6d1-d11f-402e-97f4-b96c6a10744f.jpeg"
          }
        ]
      },
      {
        id: 10002,
        name: "工程部",
        level: 1,
        parent_id: 10000,
        children: [
          {
            id: 10011,
            name: "蜀川维保队",
            level: 2,
            parent_id: 10002,
            members: [
              {
                id: 20010,
                realname: "诸葛亮",
                nickname: "诸葛孔明",
                position: "维保队长",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
                summit: 1
              },
              {
                id: 20011,
                realname: "法正",
                nickname: "法孝直",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20012,
                realname: "庞统",
                nickname: "庞士元",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20013,
                realname: "徐庶",
                nickname: "徐元直",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20014,
                realname: "蒋琬",
                nickname: "蒋公琰",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20015,
                realname: "费祎",
                nickname: "费文伟",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20016,
                realname: "董允",
                nickname: "董休昭",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              }
            ]
          },
          {
            id: 10012,
            name: "曹魏维保队",
            level: 2,
            parent_id: 10002,
            members: [
              {
                id: 20017,
                realname: "郭嘉",
                nickname: "郭奉孝",
                position: "维保队长",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
                summit: 1
              },
              {
                id: 20018,
                realname: "荀彧",
                nickname: "荀文若",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20019,
                realname: "荀攸",
                nickname: "荀公达",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20020,
                realname: "贾诩",
                nickname: "贾文和",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20021,
                realname: "程昱",
                nickname: "程仲德",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20022,
                realname: "杨修",
                nickname: "杨德祖",
                position: "作死小能手",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              }
            ]
          },
          {
            id: 10013,
            name: "东吴维保队",
            level: 2,
            parent_id: 10002,
            members: [
              {
                id: 20023,
                realname: "周瑜",
                nickname: "周公瑾",
                position: "维保队长",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
                summit: 1
              },
              {
                id: 20024,
                realname: "陆逊",
                nickname: "陆伯言",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20025,
                realname: "张昭",
                nickname: "张子布",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20026,
                realname: "张纮",
                nickname: "张子纲",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20027,
                realname: "鲁肃",
                nickname: "鲁子敬",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20028,
                realname: "诸葛瑾",
                nickname: "诸葛子瑜",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20029,
                realname: "诸葛恪",
                nickname: "诸葛元逊",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20030,
                realname: "吕蒙",
                nickname: "吕子明",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              },
              {
                id: 20031,
                realname: "顾雍",
                nickname: "顾元叹",
                avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png",
              }
            ]
          }
        ],
        members: [
          {
            id: 20003,
            realname: "杨海波",
            nickname: "波波",
            position: "技术总监",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/e21f2fbcfc77ba1803b3fd5ee1141875/ee4d980f-646d-4efe-b67a-d6700d8980f3.jpeg",
            summit: 1
          },
          {
            id: 20032,
            realname: "刘备",
            nickname: "刘玄德",
            position: "蜀川项目组负责人",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          },
          {
            id: 20033,
            realname: "曹操",
            nickname: "曹孟德",
            position: "曹魏项目组负责人",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          },
          {
            id: 20034,
            realname: "孙权",
            nickname: "孙仲谋",
            position: "东吴项目组负责人",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          }
        ]
      },
      {
        id: 10003,
        name: "市场部",
        level: 1,
        parent_id: 10000,
        members: [
          {
            id: 20006,
            realname: "达巴拉干",
            nickname: "蒙古海军大佐",
            position: "市场总监",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/bb50a92e651db3f72a009fd7727cba18/6bbc0ca4-b889-4dc6-8292-43afcdeabe29.jpeg",
            summit: 1
          },
          {
            id: 20035,
            realname: "木华黎",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          },
          {
            id: 20036,
            realname: "孛儿只斤·拔都",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          },
          {
            id: 20037,
            realname: "只儿豁阿歹",
            nickname: "哲别",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          },
          {
            id: 20037,
            realname: "篾里乞·脱脱",
            nickname: "脱脱帖木儿",
            avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/H5/avatar%403x.png"
          }
        ]
      }
    ],
    members: [
      {
        id: 20001,
        realname: "李一能",
        nickname: "异能",
        avatar: "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erPBCMmO9p0Exn0fyMrKEqKD3ZticDEf9ic8XXfhJfdg7I5aUQGic0244fao1t5RY9mxPqdwnVNVtA4A/132"
      },
      {
        id: 20002,
        realname: "王鑫",
        nickname: "欣欣",
        position: "财务总监",
        avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/eddbbfad1d84110acccba198220155d0/fc1789fb-8d15-4440-ad8e-6e9f88bf0c2a.jpeg"
      },
      {
        id: 20003,
        realname: "杨海波",
        nickname: "波波",
        position: "技术总监",
        avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/e21f2fbcfc77ba1803b3fd5ee1141875/ee4d980f-646d-4efe-b67a-d6700d8980f3.jpeg"
      },
      {
        id: 20004,
        realname: "刘连山",
        nickname: "山炮",
        position: "营销总监",
        avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/d645ae2d3f1bf767badb116b73c12bcd/ca5ac52d-0bb6-4b30-903f-87e695de341c.jpeg"
      },
      {
        id: 20005,
        realname: "年煜",
        nickname: "年火日立",
        position: "秘书长",
        avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/c008767ae8170141698d64baa5327485/f0ce1d52-2235-4575-a259-d4d032b30134.jpeg"
      },
      {
        id: 20006,
        realname: "达巴拉干",
        nickname: "蒙古海军大佐",
        position: "市场总监",
        avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/bb50a92e651db3f72a009fd7727cba18/6bbc0ca4-b889-4dc6-8292-43afcdeabe29.jpeg"
      },
      {
        id: 20007,
        realname: "奥顿木齐尔",
        nickname: "诸葛钢铁",
        position: "总裁助理",
        avatar: "https://dbx-assets.oss-cn-shanghai.aliyuncs.com/userheader/bb29618591ba9f9cb94a615b477e7337/3766d6d1-d11f-402e-97f4-b96c6a10744f.jpeg"
      }
    ]
  }
}

export default data;

import Mock from 'mockjs';
Mock.mock(RegExp('api/userAll/listUserGwAll' + '.*'), 'get', () => {
    return {
        'code': 0,
        adviserList
    };
}
);
const { adviserList } = Mock.mock({
    'adviserList|30': [
        {
            'gwName': '@cname()',
            'userId': '@increment()',
            'guaranteeMoney|1': [100, 100, ''],
            'installment|1': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            'subsidyMoney|1': [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200],
            'userImg|1': [
                'http://img4.imgtn.bdimg.com/it/u=1694668002,850725844&fm=26&gp=0.jpg',
                'http://img5.imgtn.bdimg.com/it/u=3629037449,1522890820&fm=26&gp=0.jpg',
                'http://img4.imgtn.bdimg.com/it/u=3152799073,1957338853&fm=26&gp=0.jpg',
                'http://img0.imgtn.bdimg.com/it/u=2911430494,1758731178&fm=26&gp=0.jpg',
                'http://img3.imgtn.bdimg.com/it/u=2575180002,1330691229&fm=26&gp=0.jpg',
                'http://img4.imgtn.bdimg.com/it/u=2493068555,3948212259&fm=26&gp=0.jpg'

            ],
            'wechatImg|1': [
                'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=128258141,197802364&fm=26&gp=0.jpg'
            ],
            'wechatUsername': 15937453651
        }
    ]
});
// console.log(adviserList);

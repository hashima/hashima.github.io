<?php
// 連想配列用意
$array = [
    'tokyo' => [
        '品川',
        '五反田',
        '三軒茶屋',
        '四谷'
    ],
    'kanagawa' => [
        '横浜',
        '相模原',
        '湘南',
        '鎌倉'
    ],
    'saitama' => [
        '所沢',
        '狭山',
        '川口',
        '浦和',
        '小手指',
        '飯能'
    ]
];

// Origin null is not allowed by Access-Control-Allow-Origin.とかのエラー回避の為、ヘッダー付与
header("Access-Control-Allow-Origin: *");

echo json_encode($array);

</?php>

<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/../config.php';

$stats = [
    'status' => 'success',
    'total_paid' => '$18,492,104.50',
    'active_offers' => 3248,
    'total_publishers' => 65420,
    'total_advertisers' => 3810,
    'countries_covered' => 195,
    'today_conversions' => 18490,
    'server_time' => date('Y-m-d H:i:s'),
    'uptime_percentage' => '99.98%'
];

echo json_encode($stats, JSON_PRETTY_PRINT);

<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$jsonFile = __DIR__ . '/offers.json';
if (!file_exists($jsonFile)) {
    echo json_encode(['status' => 'error', 'message' => 'Offers data not found']);
    exit;
}

$rawOffers = json_decode(file_get_contents($jsonFile), true);

$search   = isset($_GET['search']) ? trim(strtolower($_GET['search'])) : '';
$category = isset($_GET['category']) ? trim(strtolower($_GET['category'])) : 'all';
$country  = isset($_GET['country']) ? trim(strtoupper($_GET['country'])) : 'ALL';
$sort     = isset($_GET['sort']) ? trim($_GET['sort']) : 'payout_desc';

$filtered = array_filter($rawOffers, function($offer) use ($search, $category, $country) {
    if ($category !== 'all' && strtolower($offer['category']) !== $category) {
        return false;
    }
    if ($country !== 'ALL' && !in_array($country, $offer['countries']) && !in_array('GLOBAL', $offer['countries'])) {
        return false;
    }
    if ($search !== '') {
        $matchesTitle = str_contains(strtolower($offer['title']), $search);
        $matchesCat   = str_contains(strtolower($offer['category']), $search);
        $matchesDesc  = str_contains(strtolower($offer['description']), $search);
        if (!$matchesTitle && !$matchesCat && !$matchesDesc) {
            return false;
        }
    }
    return true;
});

// Sorting
usort($filtered, function($a, $b) use ($sort) {
    if ($sort === 'payout_desc') return $b['payout'] <=> $a['payout'];
    if ($sort === 'payout_asc')  return $a['payout'] <=> $b['payout'];
    if ($sort === 'epc_desc')     return $b['epc'] <=> $a['epc'];
    return 0;
});

echo json_encode([
    'status' => 'success',
    'total' => count($filtered),
    'offers' => array_values($filtered)
], JSON_PRETTY_PRINT);

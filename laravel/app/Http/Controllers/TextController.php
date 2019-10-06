<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TextController extends Controller
{
    private $text_service;
    public function __construct(TextService $text_service)
    {
        parent::__construct();
        $this->text_service = $text_service;
    }
    /**
     * Post一覧を表示
     *
     * @return mixed
     */
    public function index()
    {
        return $this->text_service->getAllTexts();
    }
    /**
     * 特定IDのPostを取得
     *
     * @param int $id
     * @return mixed
     */
    public function text(int $id)
    {
        return $this->text_service->getTextById($id);
    }
    /**
     * Postを作成する
     *
     * @param Request $request
     */
    public function create(Request $request)
    {
        $this->post_service->createPost($request->data);
        return $this->getSuccessResponse();
    }
}

<?php
namespace App\Services;

use App\Http\Resources\Text as TextResource;
use App\Repositories\Text as TextRepository;

class Text extends BaseService
{
    private $text_repository;

    public function __construct(TextRepository $text_repository)
    {
        $this->text_repository = $text_repository;
    }

    /**
     * 全てのPostを取得し成型してJsonで返す
     *
     * @return mixed
     */
    public function getAllTexts()
    {
         return TextResource::collection($this->text_repository->getAllTexts());
    }

    /**
     * IDからPostを取得し成型してJsonで返す
     *
     * @param int $id
     * @return mixed
     */
    public function getTextById(int $id)
    {
        return new TextResource($this->text_repository->getTextById($id));
    }
}
<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Text extends Model
{
    public $fillable = [
        'title',
        'body',
        'show_flag'
    ];

}

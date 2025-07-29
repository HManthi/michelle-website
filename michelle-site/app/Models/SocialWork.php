<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SocialWork extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'description'];

    public function images()
    {
        return $this->hasMany(SocialWorkImage::class);
    }
}

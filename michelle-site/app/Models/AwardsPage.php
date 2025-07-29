<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AwardsPage extends Model
{
    use HasFactory;

    protected $table = 'awards_page';

    protected $fillable = ['title', 'description'];

    public function images()
    {
        return $this->hasMany(AwardsPageImage::class, 'awards_page_id');
    }
}

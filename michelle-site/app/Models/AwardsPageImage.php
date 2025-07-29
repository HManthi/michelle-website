<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class AwardsPageImage extends Model
{
    use HasFactory;

    protected $fillable = ['awards_page_id', 'url'];

    public function awardsPage()
    {
        return $this->belongsTo(AwardsPage::class, 'awards_page_id');
    }
}

<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SocialWorkImage extends Model
{
    use HasFactory;

    protected $fillable = ['social_work_id', 'path'];

    public function socialWork()
    {
        return $this->belongsTo(SocialWork::class);
    }
}

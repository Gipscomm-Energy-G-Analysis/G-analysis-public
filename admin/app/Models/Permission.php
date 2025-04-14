<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Permission extends Model
{
    use HasFactory;
    protected $table = 'permissions';
    protected $fillable = [
        'name',
        'guard_name',
    ];

    public function fromDateTime($value)
	{
		return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
	}
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Mandanten extends Model
{
    use HasFactory;
    protected $table ='mandanten';

    public function fromDateTime($value)
	{
		return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
	}
}

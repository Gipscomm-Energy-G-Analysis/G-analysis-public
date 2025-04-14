<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class benutzer extends Model
{
    use HasFactory;
    public $timestamps = true;
    protected $table ='benutzer';
    protected $fillable = ['titel','vorname','name','eMail','telefon','fax','mobiltelefon','username','passHash','ben_ID'];

    public function fromDateTime($value)
	{
		return Carbon::parse(parent::fromDateTime($value))->format('Y-d-m H:i:s');
	}
}

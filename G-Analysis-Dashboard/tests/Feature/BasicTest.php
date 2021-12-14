<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
// use PHPUnit\ Framework\ TestCase;


class BasicTest extends TestCase
{
    /**
     * A basic feature test example.
     * @test
     * 
     */
    public function testExample()
    {
        $response =  $this->call('GET', '/product_dashboard');
    //    $this->assertTrue(true);
        $this->assertEquals(200, $response->status());
    }
}

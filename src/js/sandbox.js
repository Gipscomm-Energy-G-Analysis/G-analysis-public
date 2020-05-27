const id = a => a ;
const self = a => a ( a ) ;
const first = a => b => a ;
const second = a => b => b ;
const singleton = a => [ a ] ;
const list = a => b => [ a ] ;
const apply = a => b => a ( b ) ;
const flip = a => b => c => a ( c ) ( b ) ;

const T = first ;
const F = second ;

const Type = {
  Function : [ id(), self(), first()(), second()(), apply()(), flip()()() ] , //Fn stands for the type "Function"
  Boolean  : [ T, F ] ,  //B is the short form for
  Operator : [ not(), and(), or(), xor() ]
}


Let a, b, c ∈ B,  fn = and,   //Let a, b, and c be of type B which contains the subtypes true, and false
fn_abc = a ( b ) ( c ) | , a = fn_and ( b ) ( c )  such that and ( T ) ( F )

function initials(name:string):string {
  return name.split(' ').map(part => part.charAt(0)).join('');
}

function isFullName(name:string):boolean {
  return name.split(' ').length >= 3;
}

let name = 'Richard Mark Volkmann';
//let name = 'Mark Volkmann';
console.log('initials are', initials(name));
//console.log(initials(19));
console.log('full name?', isFullName(name));
//console.log('types', $traceurRuntime.type);

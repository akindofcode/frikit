// comprobamos que el userId especificado es el propietario del documento
ownsDocument = function(userId, doc) {
	return doc && doc.userId === userId;
}